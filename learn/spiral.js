let scene,camera,renderer,canvas;
scene = new THREE.Scene()
renderer = new THREE.WebGLRenderer({
    canvas:document.getElementById('c'),
    antialias: true
})
// renderer.setPixelRatio(screen.pixelDepth)
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
let x,y,
    a = 0,
    b = 0.2,
    radius = 0,
    radiusInterval = 0.1,
    points = [];
for (let index = 0; index < 5000; index+=3) {
    radius += radiusInterval
    x = (a + b*radius) * Math.cos(radius)
    y = (a + b*radius) * Math.sin(radius)
    points = points.concat([x,0,y])
}
let l_geometry = new THREE.BufferGeometry()
let l_attribute = new THREE.BufferAttribute(new Float32Array(points), 3)
    // l_attribute.setUsage(THREE.DynamicDrawUsage)
    l_geometry.setAttribute("position",l_attribute)
let L_ma = new THREE.LineBasicMaterial({color: 0xff0000})
let l = new THREE.Line(l_geometry, L_ma)
// var p_array = l.geometry.attributes.position.array
scene.add(l)
let count = 0
function render (time) {
    if (count >= points.length/3) return
    requestAnimationFrame(render)
    count ++
    l_geometry.setDrawRange(0,count)
    l.material.color.setHSL(Math.random(), 1, .5)
    renderer.render(scene,camera)
}
render()
