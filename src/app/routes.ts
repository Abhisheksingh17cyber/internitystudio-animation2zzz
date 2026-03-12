import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { ProductPage } from "./pages/ProductPage";
import { CollectionPage } from "./pages/CollectionPage";
import { CraftPage } from "./pages/CraftPage";
import { ArtisansPage } from "./pages/ArtisansPage";
import { ContactPage } from "./pages/ContactPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "collection", Component: CollectionPage },
      { path: "craft", Component: CraftPage },
      { path: "artisans", Component: ArtisansPage },
      { path: "contact", Component: ContactPage },
      { path: "product/:id", Component: ProductPage },
      { path: "shop", Component: CollectionPage },
    ],
  },
]);
