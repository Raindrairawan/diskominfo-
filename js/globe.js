// Globe Animation using Three.js
document.addEventListener('DOMContentLoaded', function() {
  // Check if the globe container exists
  const globeContainer = document.getElementById('globe-container');
  if (!globeContainer) return;

  // Set up scene
  const scene = new THREE.Scene();
  
  // Set up camera
  const camera = new THREE.PerspectiveCamera(75, globeContainer.clientWidth / globeContainer.clientHeight, 0.1, 1000);
  camera.position.z = 200;
  
  // Set up renderer
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true // Transparent background
  });
  renderer.setSize(globeContainer.clientWidth, globeContainer.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  globeContainer.appendChild(renderer.domElement);
  
  // Create globe geometry
  const globeGeometry = new THREE.SphereGeometry(80, 64, 64);
  
  // Create globe material
  const globeMaterial = new THREE.MeshPhongMaterial({
    color: 0x16a085,
    transparent: true,
    opacity: 0.8,
    wireframe: true
  });
  
  // Create globe mesh
  const globe = new THREE.Mesh(globeGeometry, globeMaterial);
  scene.add(globe);
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(200, 200, 200);
  scene.add(directionalLight);
  
  // Add points on the globe
  const pointsGroup = new THREE.Group();
  scene.add(pointsGroup);
  
  // Create 200 random points on the globe
  for (let i = 0; i < 200; i++) {
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;
    
    const x = 82 * Math.sin(theta) * Math.cos(phi);
    const y = 82 * Math.sin(theta) * Math.sin(phi);
    const z = 82 * Math.cos(theta);
    
    const pointGeometry = new THREE.SphereGeometry(0.5, 8, 8);
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const point = new THREE.Mesh(pointGeometry, pointMaterial);
    
    point.position.set(x, y, z);
    pointsGroup.add(point);
  }
  
  // Add connection lines between some points
  const lineMaterial = new THREE.LineBasicMaterial({ 
    color: 0x16a085,
    transparent: true,
    opacity: 0.5
  });
  
  // Create 50 random connections
  for (let i = 0; i < 50; i++) {
    const pointA = pointsGroup.children[Math.floor(Math.random() * pointsGroup.children.length)];
    const pointB = pointsGroup.children[Math.floor(Math.random() * pointsGroup.children.length)];
    
    if (pointA !== pointB) {
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        pointA.position,
        pointB.position
      ]);
      
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
    }
  }
  
  // Handle window resize
  window.addEventListener('resize', function() {
    camera.aspect = globeContainer.clientWidth / globeContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(globeContainer.clientWidth, globeContainer.clientHeight);
  });
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the globe
    globe.rotation.y += 0.002;
    pointsGroup.rotation.y += 0.002;
    
    // Render the scene
    renderer.render(scene, camera);
  }
  
  // Start animation
  animate();
  
  // Add mouse interaction
  let isDragging = false;
  let previousMousePosition = {
    x: 0,
    y: 0
  };
  
  globeContainer.addEventListener('mousedown', function(e) {
    isDragging = true;
  });
  
  globeContainer.addEventListener('mousemove', function(e) {
    const deltaMove = {
      x: e.offsetX - previousMousePosition.x,
      y: e.offsetY - previousMousePosition.y
    };
    
    if (isDragging) {
      const deltaRotationQuaternion = new THREE.Quaternion()
        .setFromEuler(new THREE.Euler(
          toRadians(deltaMove.y * 0.5),
          toRadians(deltaMove.x * 0.5),
          0,
          'XYZ'
        ));
      
      globe.quaternion.multiplyQuaternions(deltaRotationQuaternion, globe.quaternion);
      pointsGroup.quaternion.multiplyQuaternions(deltaRotationQuaternion, pointsGroup.quaternion);
    }
    
    previousMousePosition = {
      x: e.offsetX,
      y: e.offsetY
    };
  });
  
  document.addEventListener('mouseup', function() {
    isDragging = false;
  });
  
  // Helper function to convert degrees to radians
  function toRadians(angle) {
    return angle * (Math.PI / 180);
  }
});