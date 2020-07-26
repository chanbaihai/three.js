let scene,camera,renderer,canvas;
scene = new THREE.Scene()
renderer = new THREE.WebGLRenderer({
	canvas:document.getElementById('c'),
	antialias: true
})
let fov = 40,
	near = 0.01,
	far = 2000,
	aspect = 2
camera = new THREE.PerspectiveCamera(fov,2,near,far)
camera.position.set(0,100,0)
camera.up.set(0,0,1)
camera.lookAt(0,0,0)
let light = new THREE.AmbientLight(0x404040,5)
scene.add(light)
let obj = new THREE.Object3D()
let geo = new THREE.BoxBufferGeometry(2,2,2)
let material = new THREE.MeshPhongMaterial({color: 0xff0000})
let mesh = new THREE.Mesh(geo,material)
obj.add(mesh)
scene.add(obj)
let a = 0,b = 0.03,rad = 0;
// let rotateMatrix = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), 0.1)
let points = []
let l_g = new THREE.BufferGeometry()
let l_m = new THREE.LineBasicMaterial({color: 0xff0000})
function render(time) {
	requestAnimationFrame(render)
	time = time * 0.001
	mesh.position.x += b
	obj.rotation.y += 0.1
	points.push(mesh.getWorldPosition())
	l_g.setFromPoints(points)
	let l = new THREE.Line(l_g,l_m)
	scene.add(l)
	renderer.render(scene,camera)
}
render()
