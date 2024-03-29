import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		exclude: [...configDefaults.exclude, "./test/**/mocks/*.ts"],
		coverage: {
			enabled: true,
			provider: "v8",
			exclude: [
				"src/**/contracts/**/*.ts",
				"src/**/config/**/*.ts",
				"src/application/errors/**/*.ts",
				"src/application/helpers/**/*.ts",
				"src/main/adapters/*.ts",
				"src/main/server.ts",
				"src/main/**/change*-daily-card*.ts",
			],
			include: ["src"],
		},
		root: ".",
		include: ["test/**/*.ts"],
		setupFiles: ["dotenv/config"],
	},
});
