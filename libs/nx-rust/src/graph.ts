import {
  ProjectGraph,
  ProjectGraphBuilder,
  ProjectTargetConfigurator,
  TargetConfiguration,
  workspaceRoot,
} from '@nx/devkit';
import { ProjectGraphProcessor } from 'nx/src/config/project-graph';
import { Package } from './models/cargo-metadata';
import { cargoMetadata } from './utils/cargo';

/**
 * Adds an explicit dependency to the project graph.
 * @param pkg The package to add the dependency to.
 * @param builder The project graph builder.
 * @param depName The name of the dependency to add.
 */
function addExplicitDependency(
  pkg: Package,
  builder: ProjectGraphBuilder,
  depName: string
): void {
  const target =
    // pkg.targets.find((target) => target.name === pkg.name)?.src_path ??
    pkg.manifest_path.replace(/\\/g, '/');

  const workspaceRootClean = workspaceRoot.replace(/\\/g, '/');

  builder.addStaticDependency(
    pkg.name,
    depName,
    target.replace(`${workspaceRootClean}/`, '')
  );
}

/**
 * This is the entry point for the project graph processor.
 * @param graph The project graph to process.
 * @returns The processed project graph.
 */
export const processProjectGraph: ProjectGraphProcessor = (
  graph: ProjectGraph
  // ctx: ProjectGraphProcessorContext
): ProjectGraph => {
  const metadata = cargoMetadata();
  if (!metadata) {
    return graph;
  }

  const { packages: cargoPackages } = metadata;

  const builder = new ProjectGraphBuilder(graph);

  const cargoPackageMap = cargoPackages.reduce((acc, pro) => {
    if (!acc.has(pro.name)) {
      acc.set(pro.name, pro);
    }
    return acc;
  }, new Map<string, Package>());

  for (const pkg of cargoPackages) {
    if (graph.nodes[pkg.name]) {
      for (const deps of pkg.dependencies) {
        // if the dependency is listed in nx projects, it's not an external dependency
        if (graph.nodes[deps.name]) {
          addExplicitDependency(pkg, builder, deps.name);
        } else {
          const externalDepName = `cargo:${deps.name}`;
          if (!graph.externalNodes?.[externalDepName]) {
            builder.addExternalNode({
              type: 'cargo' as 'npm',
              name: externalDepName as `npm:${string}`,
              data: {
                packageName: deps.name,
                version: cargoPackageMap.get(deps.name)?.version ?? '0.0.0',
              },
            });
          }
          addExplicitDependency(pkg, builder, externalDepName);
        }
      }
    }
  }

  return builder.getUpdatedProjectGraph();
};

/**
 * This is the entry point for the project target configurator.
 * @param file The path to the workspace.json file.
 * @returns The project target configuration.
 */
export const registerProjectTargets: ProjectTargetConfigurator = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  file: string
): Record<string, TargetConfiguration> => ({});
