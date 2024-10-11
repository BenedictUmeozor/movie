import { getAllLists } from "@/server/database/lists";
import Container from "../ui/container";
import CommunityList from "./list";

const ListPage = async () => {
  const lists = await getAllLists();

  return (
    <div className="mt-12">
      <Container className="grid grid-cols-2 gap-2 lg:grid-cols-3">
        {lists.map((list) => (
          <CommunityList key={list._id} list={list} />
        ))}
      </Container>
    </div>
  );
};
export default ListPage;
