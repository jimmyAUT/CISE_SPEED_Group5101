import { NextPage } from "next";
import { useRouter } from "next/router";
import formStyles from "../../../styles/Form.module.scss";

const Admin: NextPage = () => {
  const router = useRouter(); // 使用 useRouter 钩子来执行导航

  const handleShowArticles = () => {
    router.push("/admin/articles");
  };
  const handleShowUsers = () => {
    router.push("/admin/users");
  };
  const handleShowSubmits = () => {
    router.push("/admin/review");
  };

  return (
    <div className="container">
      <button className={formStyles.formItem} onClick={handleShowArticles}>
        Show Articles
      </button>
      <button className={formStyles.formItem} onClick={handleShowUsers}>
        Show Users
      </button>
      <button className={formStyles.formItem} onClick={handleShowSubmits}>
        Show new Submissions
      </button>
    </div>
  );
};

export default Admin;
