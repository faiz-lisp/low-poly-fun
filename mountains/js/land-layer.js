
Botman.LandLayer = {};

Botman.LandLayer.generate_surface_points = function() {

	var points = Botman.Util.diamond_square( 17, 0, 7 );
	var min = 999;
	for ( var x = 0; x < points.length; x++ ) {

		for ( var y = 0; y < points[x].length; y++ ) {

			points[x][y] = Math.abs( points[x][y] ) * 4; // multiplication here amplifies features
			if ( points[x][y] < min ) {
		
				min = points[x][y];
			}
		}
	}
	//console.log(points);

	// Lower all points by their minimum
	for ( var x = 0; x < points.length; x++ ) {

		for ( var y = 0; y < points[x].length; y++ ) {

			points[x][y] -= min;
		}
	}
	
	return points;
};

Botman.LandLayer.draw = function( points ) {

	//
	// Draw surface terrain
	var land = new THREE.Object3D();
	
	var material = new THREE.MeshLambertMaterial( { color: 0xD8D6A3, shading: THREE.FlatShading } );
	//var material = new THREE.MeshBasicMaterial( { color: 0xD8D6A3, side: THREE.DoubleSide } );

	for ( var x = 0; x < points.length - 1; x++ ) {

		for ( var y = 0; y < points[x].length - 1; y++ ) {

			var geometry = new THREE.Geometry();

			// X is left/right, Y is the up/down axis (height), and Z in/out of the screen
			geometry.vertices.push( new THREE.Vector3( x * 10, points[x][y], y * 10 ) );
			geometry.vertices.push( new THREE.Vector3( x * 10, points[x][y + 1], ( y * 10 ) + 10 ) );
			geometry.vertices.push( new THREE.Vector3( ( x * 10 ) + 10, points[x + 1][y], y * 10 ) );
			geometry.vertices.push( new THREE.Vector3( ( x * 10 ) + 10, points[x + 1][y + 1], ( y * 10 ) + 10 ) );
			geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
			geometry.faces.push( new THREE.Face3( 3, 2, 1 ) );
			geometry.computeFaceNormals();

			var square_mesh = new THREE.Mesh( geometry, material );
			land.add( square_mesh );
		}
	}

	return land;	
};
