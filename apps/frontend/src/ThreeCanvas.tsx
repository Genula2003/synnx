import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  theme: 'liquid-glass' | 'cotton-candy' | 'clay' | 'midnight' | 'neon-cyber';
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Setup lights matching the theme
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.2, 50);
    pointLight.position.set(5, 5, 8);
    scene.add(pointLight);

    // Dynamic directional light for volumetric highlights
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(-5, 8, 5);
    scene.add(dirLight);

    // Build floating particles
    const particleCount = theme === 'midnight' ? 40 : theme === 'neon-cyber' ? 60 : 25;
    const geometry = new THREE.SphereGeometry(0.12, 16, 16);

    // Choose particle colors based on active theme
    let color = 0x22d3ee; // Liquid Glass default
    if (theme === 'cotton-candy') color = 0xf472b6;
    if (theme === 'clay') color = 0xa3b1c6;
    if (theme === 'midnight') color = 0xffffff;
    if (theme === 'neon-cyber') color = 0x00ffcc;

    const material = new THREE.MeshPhysicalMaterial({
      color,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: theme === 'midnight' ? 0.3 : 0.6,
      transmission: 0.6, // Glass transparency sheen
      ior: 1.5,
    });

    const particles: THREE.Mesh[] = [];
    for (let i = 0; i < particleCount; i++) {
      const mesh = new THREE.Mesh(geometry, material.clone());
      mesh.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 10
      );
      // Vary sizes slightly for depth perspective
      const scale = Math.random() * 1.5 + 0.5;
      mesh.scale.set(scale, scale, scale);
      scene.add(mesh);
      particles.push(mesh);
    }

    // Parallax mouse movements
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX - window.innerWidth / 2) * 0.002;
      targetY = (e.clientY - window.innerHeight / 2) * 0.002;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Animate Pointlight orbit
      pointLight.position.x = Math.sin(elapsedTime * 0.5) * 10;
      pointLight.position.y = Math.cos(elapsedTime * 0.5) * 10;

      // Gentle movement for particles
      particles.forEach((p, idx) => {
        p.position.y += Math.sin(elapsedTime + idx) * 0.003;
        p.position.x += Math.cos(elapsedTime * 0.5 + idx) * 0.002;
        p.rotation.x += 0.01;
        p.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, [theme]);

  return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />;
};
export default ThreeCanvas;
