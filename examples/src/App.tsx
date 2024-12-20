import { fr } from "@codegouvfr/react-dsfr";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";

import { RouteProvider, routes } from "./router";
import RouterRenderer from "./RouterRenderer";

function App() {
    return (
        <>
            <Header
                brandTop={
                    <>
                        INTITULE
                        <br />
                        OFFICIEL
                    </>
                }
                serviceTitle="Nom du site / service"
                homeLinkProps={{
                    ...routes.home().link,
                    title: "Accueil",
                }}
                navigation={[
                    {
                        text: "Editor",
                        linkProps: routes.home().link,
                    },
                    {
                        text: "Custom",
                        linkProps: routes.custom().link,
                    },
                    {
                        text: "Markdown",
                        linkProps: routes.markdown().link,
                    },
                ]}
                quickAccessItems={[headerFooterDisplayItem]}
            />
            <main>
                <RouteProvider>
                    <div className={fr.cx("fr-container")}>
                        <RouterRenderer />
                    </div>
                </RouteProvider>
            </main>
            <Footer
                accessibility="fully compliant"
                contentDescription={`
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                        eu fugiat nulla pariatur. 
                    `}
                bottomItems={[headerFooterDisplayItem]}
            />
        </>
    );
}

export default App;
