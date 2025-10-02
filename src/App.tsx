import { type FileSystemTree, WebContainer } from "@webcontainer/api";
import { useEffect, useRef } from "react";
import { files } from "./files";

let isInstantiated = false;

function App() {
	const iframeRef = useRef<HTMLIFrameElement | null>(null);
	useEffect(() => {
		const setup = async () => {
			if (isInstantiated) {
				return;
			}
			isInstantiated = true;

			const openaiApiKey = prompt("Enter your OpenAI API key");
			if (!openaiApiKey) {
				alert("Aborted");
				return;
			}

			const modifiedFiles: FileSystemTree = {
				...files,
				".env": { file: { contents: `OPENAI_API_KEY=${openaiApiKey}` } },
			};

			const webcontainerInstance = await WebContainer.boot();

			await webcontainerInstance.mount(modifiedFiles);

			const installProcess = await webcontainerInstance.spawn("npm", [
				"install",
			]);
			installProcess.output.pipeTo(
				new WritableStream({
					write(data) {
						console.log(data);
					},
				}),
			);
			const installExitCode = await installProcess.exit;
			if (installExitCode !== 0) {
				throw new Error("Unable to run npm install");
			}

			const serverProcess = await webcontainerInstance.spawn("npm", [
				"run",
				"dev",
			]);
			serverProcess.output.pipeTo(
				new WritableStream({
					write(data) {
						console.log(data);
					},
				}),
			);
			webcontainerInstance.on("server-ready", (_port, url) => {
				if (iframeRef.current) {
					iframeRef.current.src = `${url}/ui`;
				}
			});
			const serverExitCode = await serverProcess.exit;
			if (serverExitCode !== 0) {
				throw new Error("Unable to run npm run dev");
			}
		};
		setup();
	}, []);
	return (
		<iframe title="VoltAgent" ref={iframeRef} className="w-screen h-screen" />
	);
}

export default App;
