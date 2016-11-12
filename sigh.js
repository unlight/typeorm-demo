var glob, write, merge;
var ts, process, thru, ava;

module.exports = function(pipelines) {

    pipelines.server = [
        glob('server.ts', 'entity/*'),
        ts({target: 'es5'}),
        write('build'),
        // process('node build/server.js')
    ]
    
    // pipelines["source"] = [
    //     glob({ basePath: "src" }, "**/!(*.test).ts"),
    //     ts({declaration: true, sourceMap: true, module: "commonjs", types}),
    //     write("build"),
    // ];

    pipelines["test"] = [
        merge(
            { collectInitial: true },
            [
                glob('entity/*.ts'),
                ts()
            ],
            [
                glob('index.test.ts'),
                ts({target: 'es6', module: 'es2015'})
            ]
        ),
        write("build"),
        ava({files: "build/*.test.js", verbose: true, serial: true})
    ];

    // pipelines["build"] = [
    //     glob({ basePath: "src" }, "**/!(*.test).ts"),
    //     ts({declaration: true, sourceMap: true, types}),
    //     write("build"),
    // ]
}