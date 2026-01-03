"use client";

import { useEffect, useRef } from "react";
import shaderConfig from "@/data/sarcastic_remix.json";

interface EffectLayer {
  id: string;
  type: string;
  visible: boolean;
  usesPingPong: boolean;
  animating: boolean;
  speed?: number;
  scale?: number;
  compiledVertexShaders: string[];
  compiledFragmentShaders: string[];
  data?: {
    downSample?: number;
    isBackground?: boolean;
    depth?: boolean;
    uniforms?: Record<string, any>;
    passes?: Array<{ prop: string; value: number; downSample?: number; includeBg?: boolean }>;
    texture?: { src: string; sampler: string };
    states?: any;
  };
}

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const timeRef = useRef(0);
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });
  const previousMousePosRef = useRef({ x: 0.5, y: 0.5 });
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const programsRef = useRef<Map<string, WebGLProgram>>(new Map());
  const framebuffersRef = useRef<WebGLFramebuffer[]>([]);
  const texturesRef = useRef<WebGLTexture[]>([]);
  const pingPongBuffersRef = useRef<{ read: WebGLFramebuffer; write: WebGLFramebuffer } | null>(null);
  const pingPongTexturesRef = useRef<{ read: WebGLTexture; write: WebGLTexture } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas ref is null");
      return;
    }

    const gl = canvas.getContext("webgl2", { 
      alpha: true, 
      antialias: true,
      premultipliedAlpha: false 
    });
    if (!gl) {
      console.error("WebGL2 not supported");
      return;
    }

    glRef.current = gl;
    const effects = (shaderConfig as any).history as EffectLayer[];
    
    if (!effects || effects.length === 0) {
      console.error("No effects found in shader config");
      return;
    }
    
    console.log(`Loaded ${effects.length} effects from JSON`);
    console.log("Effects:", effects.map(e => ({ id: e.id, type: e.type, visible: e.visible, isBackground: e.data?.isBackground })));

    // Helper functions
    function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(`Shader compilation error (${type === gl.VERTEX_SHADER ? 'vertex' : 'fragment'}):`, gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
      const program = gl.createProgram();
      if (!program) return null;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program linking error:", gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      return program;
    }

    // Create quad geometry with texture coordinates
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    const quadData = new Float32Array([
      -1, -1, 0, 0,
       1, -1, 1, 0,
      -1,  1, 0, 1,
      -1,  1, 0, 1,
       1, -1, 1, 0,
       1,  1, 1, 1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, quadData, gl.STATIC_DRAW);

    // Create identity matrices
    const identityMatrix = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);

    // Create texture and framebuffer helpers
    function createTexture(width: number, height: number): WebGLTexture | null {
      if (!gl) return null;
      const texture = gl.createTexture();
      if (!texture) return null;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return texture;
    }

    function createFramebuffer(texture: WebGLTexture): WebGLFramebuffer | null {
      if (!gl) return null;
      const framebuffer = gl.createFramebuffer();
      if (!framebuffer) return null;
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
        console.error("Framebuffer incomplete");
        return null;
      }
      return framebuffer;
    }

    // Compile shader programs for single-pass effects
    // Multi-pass effects will be compiled on-demand in renderEffect
    let compiledCount = 0;
    effects.forEach((effect) => {
      if (!effect.visible) return;
      
      // Skip if it has multiple passes (will be compiled on-demand)
      if (effect.data?.passes && effect.data.passes.length > 1) {
        return;
      }
      
      // Skip water ripple (handled specially)
      if (effect.type === "waterRipple" && effect.usesPingPong) {
        return;
      }

      if (!gl) return;

      const vertexShaderSource = effect.compiledVertexShaders[0];
      const fragmentShaderSource = effect.compiledFragmentShaders[0];

      const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

      if (vertexShader && fragmentShader) {
        const program = createProgram(gl, vertexShader, fragmentShader);
        if (program) {
          programsRef.current.set(effect.id, program);
          compiledCount++;
          console.log(`Compiled shader for ${effect.id} (${effect.type})`);
        } else {
          console.error(`Failed to create program for ${effect.id}`);
        }
      } else {
        console.error(`Failed to compile shaders for ${effect.id}`);
      }
    });
    
    console.log(`Compiled ${compiledCount} shader programs`);

    // Set up viewport
    let width = 0;
    let height = 0;

    function resize() {
      if (!canvas || !gl) return;
      const displayWidth = canvas.clientWidth || window.innerWidth;
      const displayHeight = canvas.clientHeight || window.innerHeight;
      
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        width = displayWidth;
        height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
        

        // Recreate framebuffers and textures
        texturesRef.current.forEach(tex => gl.deleteTexture(tex));
        framebuffersRef.current.forEach(fb => gl.deleteFramebuffer(fb));
        texturesRef.current = [];
        framebuffersRef.current = [];

        // Create ping-pong buffers for water ripple
        const waterRippleEffect = effects.find(e => e.type === "waterRipple");
        if (waterRippleEffect && width > 0 && height > 0) {
          const pingPongTex1 = createTexture(width, height);
          const pingPongTex2 = createTexture(width, height);
          if (pingPongTex1 && pingPongTex2) {
            const fb1 = createFramebuffer(pingPongTex1);
            const fb2 = createFramebuffer(pingPongTex2);
            if (fb1 && fb2) {
              pingPongTexturesRef.current = { read: pingPongTex1, write: pingPongTex2 };
              pingPongBuffersRef.current = { read: fb1, write: fb2 };
            }
          }
        }
      }
    }
    
    // Initial resize
    resize();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      previousMousePosRef.current = { ...mousePosRef.current };
      mousePosRef.current = {
        x: e.clientX / rect.width,
        y: 1 - (e.clientY / rect.height),
      };
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    // Render a single effect
    function renderEffect(
      effect: EffectLayer,
      inputTexture: WebGLTexture | null,
      outputFramebuffer: WebGLFramebuffer | null,
      passIndex: number = 0
    ): WebGLTexture | null {
      if (!gl) return null;
      // For multi-pass effects, we need to use the correct shader
      // For now, use the first shader (we'll enhance this if needed)
      const vertexShaderSource = effect.compiledVertexShaders[Math.min(passIndex, effect.compiledVertexShaders.length - 1)];
      const fragmentShaderSource = effect.compiledFragmentShaders[Math.min(passIndex, effect.compiledFragmentShaders.length - 1)];
      
      // Create or get program for this pass
      const programKey = `${effect.id}_pass${passIndex}`;
      let program: WebGLProgram | null | undefined = programsRef.current.get(programKey);
      
      if (!program) {
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (vertexShader && fragmentShader) {
          const newProgram = createProgram(gl, vertexShader, fragmentShader);
          if (newProgram) {
            programsRef.current.set(programKey, newProgram);
            program = newProgram;
          }
        }
      }
      
      if (!program) {
        // Fallback to main program
        program = programsRef.current.get(effect.id);
        if (!program) return inputTexture;
      }

      gl.useProgram(program);

      // Set up geometry
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      const positionLocation = gl.getAttribLocation(program, "aVertexPosition");
      const textureCoordLocation = gl.getAttribLocation(program, "aTextureCoord");

      if (positionLocation >= 0) {
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 16, 0);
      }
      if (textureCoordLocation >= 0) {
        gl.enableVertexAttribArray(textureCoordLocation);
        gl.vertexAttribPointer(textureCoordLocation, 2, gl.FLOAT, false, 16, 8);
      }

      // Set up uniforms
      const mvMatrixLocation = gl.getUniformLocation(program, "uMVMatrix");
      const pMatrixLocation = gl.getUniformLocation(program, "uPMatrix");
      const textureMatrixLocation = gl.getUniformLocation(program, "uTextureMatrix");
      const mousePosLocation = gl.getUniformLocation(program, "uMousePos");
      const previousMousePosLocation = gl.getUniformLocation(program, "uPreviousMousePos");
      const timeLocation = gl.getUniformLocation(program, "uTime");
      const resolutionLocation = gl.getUniformLocation(program, "uResolution");
      const scaleLocation = gl.getUniformLocation(program, "uScale");
      const textureLocation = gl.getUniformLocation(program, "uTexture");
      const pingPongTextureLocation = gl.getUniformLocation(program, "uPingPongTexture");
      const bgTextureLocation = gl.getUniformLocation(program, "uBgTexture");

      if (mvMatrixLocation) gl.uniformMatrix4fv(mvMatrixLocation, false, identityMatrix);
      if (pMatrixLocation) gl.uniformMatrix4fv(pMatrixLocation, false, identityMatrix);
      if (textureMatrixLocation) gl.uniformMatrix4fv(textureMatrixLocation, false, identityMatrix);
      if (mousePosLocation) gl.uniform2f(mousePosLocation, mousePosRef.current.x, mousePosRef.current.y);
      if (previousMousePosLocation) gl.uniform2f(previousMousePosLocation, previousMousePosRef.current.x, previousMousePosRef.current.y);
      if (timeLocation) {
        const time = effect.animating ? timeRef.current * (effect.speed || 1) : 0;
        gl.uniform1f(timeLocation, time);
      }
      if (resolutionLocation) gl.uniform2f(resolutionLocation, width, height);
      if (scaleLocation && effect.scale !== undefined) {
        // Handle animated scale for noiseBlur
        const scale = effect.scale;
        gl.uniform1f(scaleLocation, scale);
      }

      // Bind input texture
      if (textureLocation && inputTexture) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, inputTexture);
        gl.uniform1i(textureLocation, 0);
      }

      // Bind ping-pong texture for water ripple
      if (pingPongTextureLocation && pingPongTexturesRef.current) {
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, pingPongTexturesRef.current.read);
        gl.uniform1i(pingPongTextureLocation, 1);
      }

      // Bind background texture for water ripple final pass
      if (bgTextureLocation && inputTexture) {
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, inputTexture);
        gl.uniform1i(bgTextureLocation, 2);
      }

      // Bind output framebuffer
      if (outputFramebuffer) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, outputFramebuffer);
      } else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }

      // Handle downsample
      const downSample = effect.data?.downSample || 1;
      const passData = effect.data?.passes?.[passIndex];
      const effectiveDownSample = passData?.downSample || downSample;
      const renderWidth = Math.floor(width * effectiveDownSample);
      const renderHeight = Math.floor(height * effectiveDownSample);
      gl.viewport(0, 0, renderWidth, renderHeight);

      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Restore viewport
      gl.viewport(0, 0, width, height);

      // Return output texture
      if (outputFramebuffer && outputFramebuffer !== pingPongBuffersRef.current?.read && outputFramebuffer !== pingPongBuffersRef.current?.write) {
        // Find the texture associated with this framebuffer
        for (let i = 0; i < framebuffersRef.current.length; i++) {
          if (framebuffersRef.current[i] === outputFramebuffer) {
            return texturesRef.current[i];
          }
        }
      }

      return inputTexture;
    }

      // Main render loop
    function animate() {
      if (!gl) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      resize();
      if (width === 0 || height === 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      timeRef.current += 0.016;
      
      // Clear the canvas
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      // Enable blending for transparency
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      // Create intermediate framebuffers if needed
      const neededBuffers = effects.length + 5; // Extra buffers for multi-pass effects
      while (framebuffersRef.current.length < neededBuffers) {
        const texture = createTexture(width, height);
        const framebuffer = texture ? createFramebuffer(texture) : null;
        if (texture && framebuffer) {
          texturesRef.current.push(texture);
          framebuffersRef.current.push(framebuffer);
        } else {
          break;
        }
      }

      let currentTexture: WebGLTexture | null = null;
      let bufferIndex = 0;

      // Process each effect layer sequentially
      effects.forEach((effect, index) => {
        if (!effect.visible) {
          return;
        }

        // Background effect - MUST render to framebuffer for other effects to use
        if (effect.data?.isBackground) {
          const outputFb = bufferIndex < framebuffersRef.current.length ? framebuffersRef.current[bufferIndex] : null;
          const outputTex = outputFb ? texturesRef.current[bufferIndex] : null;
          
          if (!outputFb || !outputTex) {
            console.error("No framebuffer available for background effect!");
            return;
          }
          
          // Render background to framebuffer
          renderEffect(effect, null, outputFb);
          currentTexture = outputTex;
          bufferIndex++;
          return;
        }

        // Handle water ripple ping-pong
        if (effect.type === "waterRipple" && effect.usesPingPong && pingPongBuffersRef.current) {
          const passes = effect.data?.passes || [{ prop: "pass", value: 0 }];
          
          // Update ping-pong buffers for simulation
          if (passes[0]?.value === 0) {
            renderEffect(effect, currentTexture, pingPongBuffersRef.current.write, 0);
            // Swap buffers
            const temp = pingPongBuffersRef.current.read;
            pingPongBuffersRef.current.read = pingPongBuffersRef.current.write;
            pingPongBuffersRef.current.write = temp;
            const tempTex = pingPongTexturesRef.current!.read;
            pingPongTexturesRef.current!.read = pingPongTexturesRef.current!.write;
            pingPongTexturesRef.current!.write = tempTex;
          }

          // Blur passes
          if (!pingPongTexturesRef.current) return;
          let blurTexture = pingPongTexturesRef.current.read;
          passes.forEach((pass, passIdx) => {
            if (pass.value === 1 || pass.value === 2) {
              const outputFb = bufferIndex < framebuffersRef.current.length ? framebuffersRef.current[bufferIndex] : null;
              const outputTex = outputFb ? texturesRef.current[bufferIndex] : null;
              renderEffect(effect, blurTexture, outputFb, passIdx);
              if (outputTex) {
                blurTexture = outputTex;
                bufferIndex++;
              }
            }
          });

          // Final composite pass
          if (passes[3]?.includeBg && currentTexture) {
            const outputFb = bufferIndex < framebuffersRef.current.length ? framebuffersRef.current[bufferIndex] : null;
            renderEffect(effect, blurTexture, outputFb, 3);
            if (outputFb) {
              currentTexture = texturesRef.current[bufferIndex];
              bufferIndex++;
            }
          } else {
            currentTexture = blurTexture;
          }
          return;
        }

        // Handle multi-pass effects (like noiseBlur)
        // noiseBlur has 2 shaders (horizontal and vertical blur) but may only have 1 pass defined
        // If it has multiple shaders, render each as a separate pass
        if (effect.compiledFragmentShaders.length > 1) {
          let passTexture = currentTexture;
          // Render each shader as a separate pass
          for (let passIdx = 0; passIdx < effect.compiledFragmentShaders.length; passIdx++) {
            const outputFb = bufferIndex < framebuffersRef.current.length ? framebuffersRef.current[bufferIndex] : null;
            const outputTex = outputFb ? texturesRef.current[bufferIndex] : null;
            renderEffect(effect, passTexture, outputFb, passIdx);
            if (outputTex) {
              passTexture = outputTex;
              bufferIndex++;
            }
          }
          currentTexture = passTexture;
          return;
        }
        
        // Handle effects with explicit passes array
        if (effect.data?.passes && effect.data.passes.length > 1) {
          let passTexture = currentTexture;
          effect.data.passes.forEach((pass, passIdx) => {
            const outputFb = bufferIndex < framebuffersRef.current.length ? framebuffersRef.current[bufferIndex] : null;
            renderEffect(effect, passTexture, outputFb, passIdx);
            if (outputFb) {
              passTexture = texturesRef.current[bufferIndex];
              bufferIndex++;
            }
          });
          currentTexture = passTexture;
          return;
        }

        // Single pass effect
        const outputFb = bufferIndex < framebuffersRef.current.length ? framebuffersRef.current[bufferIndex] : null;
        const outputTex = outputFb ? texturesRef.current[bufferIndex] : null;
        
        renderEffect(effect, currentTexture, outputFb);
        
        if (outputTex) {
          currentTexture = outputTex;
          bufferIndex++;
        }
      });

      // Final render to screen
      // If we have a texture, render it using a simple pass-through
      // Otherwise, render the background directly
      if (currentTexture) {
        // Find the last effect that can render a texture (like vignette or dither)
        let finalProgram: WebGLProgram | null = null;
        let finalEffect: EffectLayer | null = null;
        
        // Try to find an effect that has uTexture uniform (most effects do)
        for (let i = effects.length - 1; i >= 0; i--) {
          if (effects[i].visible && !effects[i].data?.isBackground) {
            const testProg = programsRef.current.get(effects[i].id);
            if (testProg) {
              const testLoc = gl.getUniformLocation(testProg, "uTexture");
              if (testLoc) {
                finalProgram = testProg;
                finalEffect = effects[i];
                break;
              }
            }
          }
        }
        
        // Fallback: use any visible effect's program
        if (!finalProgram) {
          for (let i = effects.length - 1; i >= 0; i--) {
            if (effects[i].visible) {
              const testProg = programsRef.current.get(effects[i].id);
              if (testProg) {
                finalProgram = testProg;
                finalEffect = effects[i];
                break;
              }
            }
          }
        }
        
        if (finalProgram && finalEffect) {
          gl.useProgram(finalProgram);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
          gl.viewport(0, 0, width, height);
          
          gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
          const positionLocation = gl.getAttribLocation(finalProgram, "aVertexPosition");
          const textureCoordLocation = gl.getAttribLocation(finalProgram, "aTextureCoord");
          
          if (positionLocation >= 0) {
            gl.enableVertexAttribArray(positionLocation);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 16, 0);
          }
          if (textureCoordLocation >= 0) {
            gl.enableVertexAttribArray(textureCoordLocation);
            gl.vertexAttribPointer(textureCoordLocation, 2, gl.FLOAT, false, 16, 8);
          }

          // Set up all possible uniforms
          const mvMatrixLocation = gl.getUniformLocation(finalProgram, "uMVMatrix");
          const pMatrixLocation = gl.getUniformLocation(finalProgram, "uPMatrix");
          const textureMatrixLocation = gl.getUniformLocation(finalProgram, "uTextureMatrix");
          if (mvMatrixLocation) gl.uniformMatrix4fv(mvMatrixLocation, false, identityMatrix);
          if (pMatrixLocation) gl.uniformMatrix4fv(pMatrixLocation, false, identityMatrix);
          if (textureMatrixLocation) gl.uniformMatrix4fv(textureMatrixLocation, false, identityMatrix);

          const textureLocation = gl.getUniformLocation(finalProgram, "uTexture");
          if (textureLocation) {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, currentTexture);
            gl.uniform1i(textureLocation, 0);
          }

          const mousePosLocation = gl.getUniformLocation(finalProgram, "uMousePos");
          const previousMousePosLocation = gl.getUniformLocation(finalProgram, "uPreviousMousePos");
          const timeLocation = gl.getUniformLocation(finalProgram, "uTime");
          const resolutionLocation = gl.getUniformLocation(finalProgram, "uResolution");
          const scaleLocation = gl.getUniformLocation(finalProgram, "uScale");
          
          if (mousePosLocation) gl.uniform2f(mousePosLocation, mousePosRef.current.x, mousePosRef.current.y);
          if (previousMousePosLocation) gl.uniform2f(previousMousePosLocation, previousMousePosRef.current.x, previousMousePosRef.current.y);
          if (timeLocation) {
            const time = finalEffect.animating ? timeRef.current * (finalEffect.speed || 1) : timeRef.current;
            gl.uniform1f(timeLocation, time);
          }
          if (resolutionLocation) gl.uniform2f(resolutionLocation, width, height);
          if (scaleLocation && finalEffect.scale !== undefined) {
            gl.uniform1f(scaleLocation, finalEffect.scale);
          }

          gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
      } else {
        // Fallback: render background directly to screen if no texture chain
        const bgEffect = effects.find(e => e.data?.isBackground && e.visible);
        if (bgEffect) {
          // Ensure we're rendering to screen
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
          gl.viewport(0, 0, width, height);
          const bgProgram = programsRef.current.get(bgEffect.id);
          if (bgProgram) {
            gl.useProgram(bgProgram);
            gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
            const positionLocation = gl.getAttribLocation(bgProgram, "aVertexPosition");
            const textureCoordLocation = gl.getAttribLocation(bgProgram, "aTextureCoord");
            
            if (positionLocation >= 0) {
              gl.enableVertexAttribArray(positionLocation);
              gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 16, 0);
            }
            if (textureCoordLocation >= 0) {
              gl.enableVertexAttribArray(textureCoordLocation);
              gl.vertexAttribPointer(textureCoordLocation, 2, gl.FLOAT, false, 16, 8);
            }
            
            const mvMatrixLocation = gl.getUniformLocation(bgProgram, "uMVMatrix");
            const pMatrixLocation = gl.getUniformLocation(bgProgram, "uPMatrix");
            const mousePosLocation = gl.getUniformLocation(bgProgram, "uMousePos");
            
            if (mvMatrixLocation) gl.uniformMatrix4fv(mvMatrixLocation, false, identityMatrix);
            if (pMatrixLocation) gl.uniformMatrix4fv(pMatrixLocation, false, identityMatrix);
            if (mousePosLocation) gl.uniform2f(mousePosLocation, mousePosRef.current.x, mousePosRef.current.y);
            
            gl.drawArrays(gl.TRIANGLES, 0, 6);
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Cleanup
      if (gl) {
        programsRef.current.forEach(program => gl.deleteProgram(program));
        texturesRef.current.forEach(texture => gl.deleteTexture(texture));
        framebuffersRef.current.forEach(framebuffer => gl.deleteFramebuffer(framebuffer));
        if (pingPongTexturesRef.current) {
          gl.deleteTexture(pingPongTexturesRef.current.read);
          gl.deleteTexture(pingPongTexturesRef.current.write);
        }
        if (pingPongBuffersRef.current) {
          gl.deleteFramebuffer(pingPongBuffersRef.current.read);
          gl.deleteFramebuffer(pingPongBuffersRef.current.write);
        }
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ 
        background: "transparent",
        display: "block",
        width: "100%",
        height: "100%",
        zIndex: 0
      }}
      width={1920}
      height={1080}
    />
  );
}
