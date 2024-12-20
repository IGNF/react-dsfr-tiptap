import { createRouter, defineRoute } from "type-route";

const BASE_URL = import.meta.env?.BASE_URL?.replace(/\/$/, "") ?? "/";

export const { RouteProvider, useRoute, routes } = createRouter({
    home: defineRoute(BASE_URL === "" ? "/" : BASE_URL),
    custom: defineRoute(`${BASE_URL}/custom`),
    markdown: defineRoute(`${BASE_URL}/markdown`),
});
