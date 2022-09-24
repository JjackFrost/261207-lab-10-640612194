import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  const rooms = readDB();
  const roomId = req.query.roomId;

  const messageId = req.query.messageId;
  const roomIdx = rooms.findIndex((x) => x.roomId === roomId);

  if (req.method === "DELETE") {
    if (roomIdx === -1)
      return res.status(404).json({
        ok: false,
        message: "Invalid room id",
      });
    const message = rooms[roomIdx].messages;
    const messageIdx = message.findIndex((x) => x.messageId === messageId);
    if (messageIdx === -1) {
      return res.status(404).json({
        ok: false,
        message: "Invalid message ID",
      });
    } else {
      message.splice(messageIdx, 1);
      writeDB(rooms);
      return res.json({
        ok: true,
      });
    }
  }
}
