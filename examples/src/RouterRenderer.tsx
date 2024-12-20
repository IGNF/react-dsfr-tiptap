import { useRoute } from "./router";
import Custom from "./Custom";
import Markdown from "./Markdown";
import Tiptap from "./Tiptap";

function RouterRenderer() {
    const route = useRoute();

    switch (route.name) {
        case "home":
            return <Tiptap />;

        case "custom":
            return <Custom />;

        case "markdown":
            return <Markdown />;

        default:
            return "404";
    }
}

export default RouterRenderer;
