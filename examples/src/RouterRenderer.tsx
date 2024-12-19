import { useRoute } from "./router";
import TiptapEditor from "./TiptapEditor";

function RouterRenderer() {
    const route = useRoute();

    switch (route.name) {
        case "home":
            return <TiptapEditor />;

        // case "custom":
        //     return <TestCustomTiptapEditor />;

        // case "markdown":
        //     return <TestTiptapMarkdown />;

        default:
            return "404";
    }
}

export default RouterRenderer;
