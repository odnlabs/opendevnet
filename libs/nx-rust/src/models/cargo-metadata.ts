/**
 * Cargo metadata type retrieved from
 * https://doc.rust-lang.org/cargo/commands/cargo-metadata.html.
 */

export interface Dependency {
  name: string;
  source: string;
  req: string;
  kind: unknown;
  rename: unknown;
  optional: boolean;
  uses_default_features: boolean;
  features: unknown[];
  target: string;
  path: string;
  registry: unknown;
}

export interface Target {
  'kind': string[];
  'crate_types': string[];
  'name': string;
  'src_path': string;
  'edition': string;
  'required-features': string[];
  'doc': boolean;
  'doctest': boolean;
  'test': boolean;
}

export interface Features {
  default: string[];
  feat1: unknown[];
  feat2: unknown[];
}

export interface Rs {
  'all-features': boolean;
}

export interface Docs {
  rs: Rs;
}

export interface Metadata {
  docs: Docs;
}

export interface DepKind {
  kind: unknown;
  target: string;
}

export interface Dep {
  name: string;
  pkg: string;
  dep_kinds: DepKind[];
}

export interface Node {
  id: string;
  dependencies: string[];
  deps: Dep[];
  features: string[];
}

export interface Resolve {
  nodes: Node[];
  root: string;
}

export interface Rs2 {
  'all-features': boolean;
}

export interface Docs2 {
  rs: Rs2;
}

export interface Metadata2 {
  docs: Docs2;
}

export interface Package {
  name: string;
  version: string;
  id: string;
  license: string;
  license_file: string;
  description: string;
  source: unknown;
  dependencies: Dependency[];
  targets: Target[];
  features: Features;
  manifest_path: string;
  metadata: Metadata;
  publish: string[];
  authors: string[];
  categories: string[];
  default_run: unknown;
  rust_version: string;
  keywords: string[];
  readme: string;
  repository: string;
  homepage: string;
  documentation: string;
  edition: string;
  links: unknown;
}

export interface CargoMetadata {
  packages: Package[];
  workspace_members: string[];
  resolve: Resolve;
  target_directory: string;
  version: number;
  workspace_root: string;
  metadata: Metadata2;
}
