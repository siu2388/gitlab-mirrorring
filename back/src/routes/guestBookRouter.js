import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { GuestBookService } from "../services/guestBookService";
/**
 * @desciption
 * 남의 방명록에 또 다른 사람이 글을 쓴다.
 */
const guestBookRouter = Router();
guestBookRouter.use(login_required);

guestBookRouter.post("/guestBooks/:receiverId", async (req, res, next) => {
  const authorId = req.currentUserId;

  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const receiverId = req.params.receiverId;
    const { authorName, content } = req.body;

    const newGuestBook = await GuestBookService.addGuestBook({
      authorId,
      receiverId,
      authorName,
      content,
    });

    if (newGuestBook.errorMessage) {
      throw new Error(newGuestBook.errorMessage);
    }
    res.status(201).json(newGuestBook);
    return;
  } catch (error) {
    next(error);
  }
});

// 작성된 방명록 목록 불러오기
guestBookRouter.get("/guestBooklist/:receiverId", async (req, res, next) => {
  try {
    const receiverId = req.params.receiverId;
    const guestBookList = await GuestBookService.getGuestBookList(receiverId);
    const sortedGuestBookList = guestBookList.sort().reverse()

    res.status(200).send(sortedGuestBookList);
    return;
  } catch (error) {
    next(error);
  }
});

//방명록의 주인이 글 삭제
guestBookRouter.delete(
  "/guestBooks/:receiverId/:guestBookId/remove/author",
  async (req, res, next) => {
    try {
      const authorId = req.currentUserId;
      const foundGuestBook = await GuestBookService.findOneGuestBookById(
        req.params.guestBookId
      );

      if (foundGuestBook.errorMessage) {
        throw new Error(foundGuestBook.errorMessage);
      }

      if (foundGuestBook.authorId !== authorId) {
        res.status(403).json("권한이 없습니다.");
        return;
      } else {
        const result = await GuestBookService.deleteGuestBookByGuestBookId({
          guestBookId: req.params.guestBookId,
        });
        if (result.errorMessage) {
          throw new Error(result.errorMessage);
        }

        res.status(200).json("삭제 완료");
        return;
      }
    } catch (err) {
      next(err);
    }
  }
);

//글 작성자가 글 삭제
guestBookRouter.delete(
  "/guestBooks/:receiverId/:guestBookId/remove/receiver",
  async (req, res, next) => {
    try {
      const receiverId = req.currentUserId;

      const foundGuestBook = await GuestBookService.findOneGuestBookById(
        req.params.guestBookId
      );

      if (foundGuestBook.errorMessage) {
        throw new Error(foundGuestBook.errorMessage);
      }

      if (foundGuestBook.receiverId !== receiverId) {
        return res.status(403).json("권한이 없습니다.");
      } else {
        const result = await GuestBookService.deleteGuestBookByGuestBookId({
          guestBookId: req.params.guestBookId,
        });

        if (result.errorMessage) {
          throw new Error(result.errorMessage);
        }

        res.status(200).json("삭제 완료");
        return;
      }
    } catch (err) {
      next(err);
    }
  }
);

export default guestBookRouter;
