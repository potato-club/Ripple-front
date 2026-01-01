import Navbar from "../../components/Navbar";
import type { FeedFullView } from "../../types/FeedFullview";
import * as S from "./FeedFullscreen.styles";
import prf from "../../assets/icons/account.svg";
import close from "../../assets/icons/close.svg";
import { useEffect, useState } from "react";
import type { Comment } from "../../types/Comment";

export const FeedFullscreen = ({
  feedFullView,
  profileImageUrl,
  onExit,
}: {
  feedFullView: FeedFullView;
  profileImageUrl: string | null;
  onExit: () => void;
}) => {
  const [commentResponse, setCommentResponse] = useState<Comment[]>([])
  useEffect(()=>{},[])
  return (
    <S.Cnt>
      <S.Header>
        <S.HeaderLeft>
          <S.UploaderProfile src={profileImageUrl ?? prf} alt="profile" />
          <S.UploaderName>{feedFullView.authorName}</S.UploaderName>
        </S.HeaderLeft>
        <S.ExitButton
          onClick={onExit}
          aria-label="Close"
          style={{ backgroundImage: `url("${close}")` }}
        />
      </S.Header>

      <S.MediasOut>
        <S.MediasIn>
          {feedFullView.imageUrls.map((url, index) => (
            <S.MediaItemImg
              key={index}
              style={{ backgroundImage: `url("${url}")` }}
            />
          ))}
        </S.MediasIn>
      </S.MediasOut>

      <S.Content>
        <S.ContentTitle>{feedFullView.content}</S.ContentTitle>
        <div className="tags">{feedFullView.tags.map((tag) => `#${tag} `)}</div>
      </S.Content>

      <S.Comments>
        {
          feedFullView.commentCount
        }
      </S.Comments>

      <S.NavbarWrp>
        <Navbar />
      </S.NavbarWrp>
    </S.Cnt>
  );
};
