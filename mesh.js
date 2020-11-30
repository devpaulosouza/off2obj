class Mesh {
  constructor() {
    this.verts = [];
    this.faces = [];
    this.nVerts = 0;
    this.nFaces = 0;
    this.edges = null;
  }

  writeToObjFile() {
    console.log("write to obj file");
    let resp = "";

    resp.concat("# off2obj OBJ File");
    resp.concat("# http://johnsresearch.wordpress.com\n");

    console.log("section", this.verts, this.faces);

    this.verts.forEach((vert) => {
      resp.concat("v ");
      resp.concat(vert[0]);
      resp.concat(" ");
      resp.concat(vert[1]);
      resp.concat(" ");
      resp.concat(vert[2]);
      resp.concat("\n");
    });

    resp.concat("s off\n");

    this.faces.forEach((face) => {
      resp.concat("f ");
      resp.concat(face[0] + 1);
      resp.concat(" ");
      resp.concat(face[1] + 1);
      resp.concat(" ");
      resp.concat(face[2] + 1);
      resp.concat("\n");
    });
    console.log(resp, "saida");
  }

  async loadFromOffFile(pathToOffFile) {
    this.verts = [];
    this.faces = [];
    this.nVerts = 0;
    this.nFaces = 0;

    let lines = pathToOffFile.split("\n");
    let params = lines[1].split(" ");

    this.nVerts = parseInt(params[0]);
    this.nFaces = parseInt(params[1]);

    var vertLines = lines.slice(2, 2 + this.nVerts);
    let faceLines = lines.slice(2 + this.nVerts, this.nVerts + this.nFaces);

    vertLines.forEach((vertLine) => {
      let XYZ = vertLine.trim().split(/\s+/);
      this.verts.push([XYZ[0], XYZ[1], XYZ[2]]);
    });

    faceLines.forEach((faceLine) => {
      let XYZ = faceLine.trim().split(/\s+/);
      this.faces.push(XYZ[1], XYZ[2], XYZ[3]);
      if (!(parseInt(XYZ[0]) == 3)) {
        console.log(
          "ERROR: This OFF loader can only handle meshes with 3 vertex faces."
        );
        console.log(
          "A face with",
          XYZ[0],
          "vertices is included in the file. Exiting."
        );
      }
    });
  }

  edgeList() {
    if (this.edges != null) {
      return this.edges;
    }
    this.edges = [];
    for (i in range(0, this.nVerts)) {
      this.edges.append([]);
    }
    for (let face in this.faces) {
      let i = face[0];
      let j = face[1];
      let k = face[2];
      if (!this.edges[i].includes(j)) {
        this.edges[i].append(j);
      }
      if (!this.edges[i].includes(k)) {
        this.edges[i].append(k);
      }
      if (!this.edges[j].includes(i)) {
        this.edges[j].append(i);
      }
      if (!this.edges[j].includes(k)) {
        this.edges[j].append(k);
      }
      if (!this.edges[k].includes(i)) {
        this.edges[k].append(i);
      }
      if (!this.edges[k].includes(j)) {
        this.edges[k].append(j);
      }
    }
    return this.edges;
  }
}

mesh = new Mesh();
mesh.loadFromOffFile(
  "OFF\n22   40   120\n0.000000   1.000000   0.000000\n0.000000   0.000000   0.000000\n0.500000   0.000000   0.000000\n0.475528   0.000000   0.154508\n0.404508   0.000000   0.293893\n0.293893   0.000000   0.404508\n0.154508   0.000000   0.475528\n0.000000   0.000000   0.500000\n-0.154508   0.000000   0.475528\n-0.293893   0.000000   0.404508\n-0.404508   0.000000   0.293893\n-0.475528   0.000000   0.154508\n-0.500000   0.000000   0.000000\n-0.475528   0.000000   -0.154508\n-0.404508   0.000000   -0.293893\n-0.293893   0.000000   -0.404508\n-0.154508   0.000000   -0.475528\n-0.000000   0.000000   -0.500000\n0.154508   0.000000   -0.475528\n0.293893   0.000000   -0.404508\n0.404508   0.000000   -0.293893\n0.475528   0.000000   -0.154508\n3 2   3   0\n3    3   2   1\n3    3   4   0\n3    4   3   1\n3    4   5   0\n3    5   4   1\n3    5   6   0\n3    6   5   1\n3    6   7   0\n3    7   6   1\n3    7   8   0\n3    8   7   1\n3    8   9   0\n3    9   8   1\n3    9   10  0\n3    10  9   1\n3    10  11  0\n3    11  10  1\n3    11  12  0\n3    12  11  1\n3    12  13  0\n3    13  12  1\n3    13  14  0\n3    14  13  1\n3    14  15  0\n3    15  14  1\n3    15  16  0\n3    16  15  1\n3    16  17  0\n3    17  16  1\n3    17  18  0\n3    18  17  1\n3    18  19  0\n3    19  18  1\n3    19  20  0\n3    20  19  1\n3    20  21  0\n3    21  20  1\n3    21  2   0\n3    2   21  1"
);
mesh.writeToObjFile();
