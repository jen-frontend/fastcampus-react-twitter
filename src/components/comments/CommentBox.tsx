import AuthContext from "context/AuthContext";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { useContext } from "react";

import styles from "./Comment.module.scss";

import { toast } from "react-toastify";

import useTranslation from "hooks/useTranslation";

export interface CommentProps {
  comment: string;
  uid: string;
  email: string;
  createdAt: string;
}

interface CommentBoxProps {
  data: CommentProps;
  post: PostProps;
}

export default function CommentBox({ data, post }: CommentBoxProps) {
  const { user } = useContext(AuthContext);
  const t = useTranslation();
  const handleDeleteComment = async () => {
    if (post) {
      try {
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          comments: arrayRemove(data),
        });
        toast.success("댓글을 삭제했습니다");
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div key={data?.createdAt} className={styles.comment}>
      <div className={styles.comment__borderBox}>
        <div className={styles.comment__imgBox}>
          <div className={styles.comment__flexBox}>
            <img src={`/logo192.png`} alt="profile" />
            <div className={styles.comment__email}>{data?.email}</div>
            <div className={styles.comment__createdAt}>{data?.createdAt}</div>
          </div>
        </div>
        <div className={styles.comment__content}>{data?.comment}</div>
        <div className={styles.comment__submitDiv}>
          {data?.uid === user?.uid && (
            <button
              type="button"
              className="comment__delete-btn"
              onClick={handleDeleteComment}
            >
              {t("BUTTON_DELETE")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
