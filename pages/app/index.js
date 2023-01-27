import AppLayout from "../../components/layout/app/app-layout";
import TileList from "../../components/layout/app/item-lists/tile-list";
import { LocalDatabase } from "../../db/localDB";

function AppPage() {
    return (
        <AppLayout>
            <TileList items={LocalDatabase} />
        </AppLayout>
    );
}

export default AppPage;