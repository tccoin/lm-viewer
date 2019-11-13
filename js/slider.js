class Slider {
    constructor(canvas, title, position) {
        this.title = title;
        this.position = position;
        this.active = true;
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
    }

    draw() {
        var bezier = require('adaptive-bezier-curve');
        var Line = require('three-line-2d')(THREE);
        var BasicShader = require('three-line-2d/shaders/basic')(THREE);

        //build a smooth bezier curve in world units
        var quality = 5;
        var curve = bezier([0, 0], [0.5, 1], [1, 1], [2, 0], quality);

        //create our geometry
        var curveGeometry = Line(curve);

        //create a material using a basic shader
        var mat = new THREE.ShaderMaterial(BasicShader({
            side: THREE.DoubleSide,
            diffuse: 0x5cd7ff,
            thickness: 0.3
        }));

        var mesh = new THREE.Mesh(curveGeometry, mat);
        app.scene.add(mesh);
    }

    update(objPosition) {

    }

    toString() {
        return `Slider('${this.title}')`;
    }
}

function toScreenPosition(obj, camera) {
    var vector = new THREE.Vector3();

    var widthHalf = 0.5 * renderer.context.canvas.width;
    var heightHalf = 0.5 * renderer.context.canvas.height;

    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);

    vector.x = (vector.x * widthHalf) + widthHalf;
    vector.y = - (vector.y * heightHalf) + heightHalf;

    return {
        x: vector.x,
        y: vector.y
    };

};