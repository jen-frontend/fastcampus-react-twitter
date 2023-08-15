import NotificationBox from "components/notifications/NotificationBox";
import AuthContext from "context/AuthContext";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import useTranslation from "hooks/useTranslation";

export interface NotificationProps {
  id: string;
  uid: string;
  url: string;
  isRead: boolean;
  content: string;
  createdAt: string;
}

export default function NotificationsPage() {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const t = useTranslation();

  useEffect(() => {
    if (user) {
      let ref = collection(db, "notifications");
      let notificationQuery = query(
        ref,
        where("uid", "==", user?.uid),
        orderBy("createdAt", "desc")
      );

      onSnapshot(notificationQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setNotifications(dataObj as NotificationProps[]);
      });
    }
  }, [user]);

  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">
          <div className="hoome__title-text">{t("MENU_NOTI")}</div>
        </div>
      </div>
      <div className="post">
        {notifications?.length > 0 ? (
          notifications?.map((noti) => (
            <NotificationBox notification={noti} key={noti.id} />
          ))
        ) : (
          <div className="post__no-posts">
            <div className="post__text">{t("NO_NOTIFICATIONS")}</div>
          </div>
        )}
      </div>
    </div>
  );
}
