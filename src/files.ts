import type { FileSystemTree } from "@webcontainer/api";
import packageJsonString from "../my-voltagent-app/package.json?raw";
import packageLockJsonString from "../my-voltagent-app/package-lock.json?raw";
import srcIndexTsString from "../my-voltagent-app/src/index.ts?raw";
import srcToolsIndexTsString from "../my-voltagent-app/src/tools/index.ts?raw";
import srcToolsWeatherTsString from "../my-voltagent-app/src/tools/weather.ts?raw";
import srcWorkflowsIndexTsString from "../my-voltagent-app/src/workflows/index.ts?raw";
import tsconfigJsonString from "../my-voltagent-app/tsconfig.json?raw";
import tsdownConfigTsString from "../my-voltagent-app/tsdown.config.ts?raw";

const files: FileSystemTree = {
	src: {
		directory: {
			tools: {
				directory: {
					"index.ts": {
						file: {
							contents: srcToolsIndexTsString,
						},
					},
					"weather.ts": {
						file: {
							contents: srcToolsWeatherTsString,
						},
					},
				},
			},
			workflows: {
				directory: {
					"index.ts": {
						file: {
							contents: srcWorkflowsIndexTsString,
						},
					},
				},
			},
			"index.ts": {
				file: {
					contents: srcIndexTsString,
				},
			},
		},
	},
	"package-lock.json": {
		file: {
			contents: packageLockJsonString,
		},
	},
	"package.json": {
		file: {
			contents: packageJsonString,
		},
	},
	"tsconfig.json": {
		file: {
			contents: tsconfigJsonString,
		},
	},
	"tsdown.config.ts": {
		file: {
			contents: tsdownConfigTsString,
		},
	},
};

export { files };
