// Three.js Gradient Blob with Glassmorphism Effect
(function() {
    'use strict';

    // Simplified noise function
    function snoise(v) {
        const C1 = 0.211324865405187;
        const C2 = 0.366025403784439;
        const C3 = -0.577350269189626;
        const C4 = 0.024390243902439;

        const i = Math.floor(v.x + v.y * C2 + v.z * C2);
        const X0 = v.x - (i - Math.floor(i * C1) * 2 - 1) * C1;
        const Y0 = v.y - (i - Math.floor(i * C1) * 2 - 1) * C1;
        const Z0 = v.z - (i - Math.floor(i * C1) * 2 - 1) * C1;

        let x1, y1, z1;
        if (X0 >= Y0) {
            if (Y0 >= Z0) { x1 = 1; y1 = 0; z1 = 0; }
            else if (X0 >= Z0) { x1 = 1; y1 = 0; z1 = 0; }
            else { x1 = 0; y1 = 0; z1 = 1; }
        } else {
            if (Y0 < Z0) { x1 = 0; y1 = 0; z1 = 1; }
            else if (X0 < Z0) { x1 = 0; y1 = 1; z1 = 0; }
            else { x1 = 1; y1 = 1; z1 = 0; }
        }

        const x2 = X0 - x1 + C1;
        const y2 = Y0 - y1 + C1;
        const z2 = Z0 - z1 + C1;
        const x3 = X0 - 0.5;
        const y3 = Y0 - 0.5;
        const z3 = Z0 - 0.5;

        return 130.0 * (x3 * x3 + y3 * y3 + z3 * z3) * Math.pow(x2 * x2 + y2 * y2 + z2 * z2, 7.0);
    }

    function initGradientBlob(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Mouse tracking
        let mouseTarget = { x: 0, y: 0 };
        let mouseSmooth = { x: 0, y: 0 };
        const mouseEasing = 0.05;

        window.addEventListener('mousemove', (e) => {
            mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // Shader material with noise
        const vertexShader = `
            uniform float time;
            uniform vec2 mousePos;
            
            varying vec3 vPosition;
            varying vec3 vNormal;
            varying vec2 vUv;
            
            // Simplified noise
            float random(vec3 st) {
                return fract(sin(dot(st.xyz, vec3(12.9898,78.233, 37.719))) * 43758.5453123);
            }
            
            float noise(vec3 st) {
                vec3 i = floor(st);
                vec3 f = fract(st);
                float a = random(i);
                float b = random(i + vec3(1.0, 0.0, 0.0));
                float c = random(i + vec3(0.0, 1.0, 0.0));
                float d = random(i + vec3(1.0, 1.0, 0.0));
                vec3 u = f * f * (3.0 - 2.0 * f);
                return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
            }
            
            void main() {
                vUv = uv;
                vNormal = normalize(normalMatrix * normal);
                
                vec3 pos = position;
                
                // Apply noise deformation
                float n1 = noise(pos * 0.5 + time * 0.1);
                float n2 = noise(pos * 0.8 + time * 0.15);
                pos += normal * (n1 * 0.3 + n2 * 0.2);
                
                // Mouse influence
                vec2 mouseInfluence = (mousePos - vec2(pos.x, pos.y)) * 0.05;
                pos.xy += mouseInfluence;
                
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                vPosition = mvPosition.xyz;
                gl_Position = projectionMatrix * mvPosition;
            }
        `;

        const fragmentShader = `
            uniform float time;
            uniform vec3 gradientColor1;
            uniform vec3 gradientColor2;
            uniform vec3 gradientColor3;
            
            varying vec3 vPosition;
            varying vec3 vNormal;
            varying vec2 vUv;
            
            float random(vec3 st) {
                return fract(sin(dot(st.xyz, vec3(12.9898,78.233, 37.719))) * 43758.5453123);
            }
            
            float noise(vec3 st) {
                vec3 i = floor(st);
                vec3 f = fract(st);
                float a = random(i);
                float b = random(i + vec3(1.0, 0.0, 0.0));
                float c = random(i + vec3(0.0, 1.0, 0.0));
                float d = random(i + vec3(1.0, 1.0, 0.0));
                vec3 u = f * f * (3.0 - 2.0 * f);
                return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
            }
            
            void main() {
                vec3 normal = normalize(vNormal);
                vec3 viewDirection = normalize(-vPosition);
                
                // Gradient
                float gradientMix = (vPosition.y + 1.0) * 0.5;
                vec3 color1 = mix(gradientColor1, gradientColor2, gradientMix);
                vec3 color2 = mix(gradientColor2, gradientColor3, gradientMix);
                vec3 baseColor = mix(color1, color2, sin(time * 0.5) * 0.5 + 0.5);
                
                // Noise color variation
                float noiseColor = noise(vPosition * 0.3 + time * 0.2) * 0.1;
                baseColor += noiseColor;
                
                // Fresnel for glassmorphism
                float fresnel = pow(1.0 - dot(viewDirection, normal), 2.0);
                
                // Glassmorphism transparency
                float opacity = 0.4 + fresnel * 0.3;
                vec3 finalColor = baseColor * (0.6 + fresnel * 0.4);
                
                // Glow
                float glow = fresnel * 0.5;
                finalColor += glow * baseColor;
                
                gl_FragColor = vec4(finalColor, opacity);
            }
        `;

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                time: { value: 0 },
                mousePos: { value: new THREE.Vector2(0, 0) },
                gradientColor1: { value: new THREE.Vector3(168/255, 85/255, 247/255) }, // purple
                gradientColor2: { value: new THREE.Vector3(59/255, 130/255, 246/255) }, // blue
                gradientColor3: { value: new THREE.Vector3(96/255, 165/255, 250/255) }, // light blue
            },
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        // Create blob geometry
        const geometry = new THREE.IcosahedronGeometry(2, 3);
        const blob = new THREE.Mesh(geometry, material);
        scene.add(blob);

        // Animation loop
        let time = 0;
        function animate() {
            requestAnimationFrame(animate);
            
            time += 0.01;
            
            // Smooth mouse interpolation
            mouseSmooth.x += (mouseTarget.x - mouseSmooth.x) * mouseEasing;
            mouseSmooth.y += (mouseTarget.y - mouseSmooth.y) * mouseEasing;
            
            // Update uniforms
            material.uniforms.time.value = time;
            material.uniforms.mousePos.value.set(
                mouseSmooth.x * 2,
                mouseSmooth.y * 2
            );
            
            // Rotate blob
            blob.rotation.x += 0.001;
            blob.rotation.y += 0.0015;
            
            renderer.render(scene, camera);
        }

        // Handle resize
        function handleResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        window.addEventListener('resize', handleResize);

        animate();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initGradientBlob('gradient-blob-container');
        });
    } else {
        initGradientBlob('gradient-blob-container');
    }
})();
