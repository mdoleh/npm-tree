export interface Bugs {
    url: string;
}

export interface Repository {
    type: string;
    url: string;
}

export interface Engines {
    node: string;
}

export interface Browserify {
    transform: string[];
}

export interface NpmUser {
    name: string;
    email: string;
}

export interface Dist {
    integrity: string;
    shasum: string;
    tarball: string;
    fileCount: number;
    unpackedSize: number;
}

export interface Maintainer {
    name: string;
    email: string;
}

export interface Directories {
}

export interface NpmOperationalInternal {
    host: string;
    tmp: string;
}

export interface PackageVersion {
    name: string;
    description: string;
    keywords: string[];
    version: string;
    homepage: string;
    bugs: Bugs;
    license: string;
    files: string[];
    main: string;
    repository: Repository;
    engines: Engines;
    dependencies: {
        [packageName: string]: string
    };
    browserify: Browserify;
    _id: string;
    _npmVersion: string;
    _nodeVersion: string;
    _npmUser: NpmUser;
    dist: Dist;
    maintainers: Maintainer[];
    directories: Directories;
    _npmOperationalInternal: NpmOperationalInternal;
}

export interface Package {
    name: string,
    description: string,
    "dist-tags": {
        latest: string,
        next: string,
        canary: string
    },
    versions: {
        [version: string]: PackageVersion
    }
}