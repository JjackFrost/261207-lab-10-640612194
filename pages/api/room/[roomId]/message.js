import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const roomId = req.query.roomId;
    const roomIdx = rooms.findIndex((x) => x.roomId === roomId);

    if (roomIdx === -1) {
      return res.status(404).json({
        ok: false,
        message: "Invalid room id",
      });
    } else {
      const messages = rooms[roomIdx].messages;
      return res.json({
        ok: true,
        messages,
      });
    }
  } else if (req.method === "POST") {
    const rooms = readDB();
    //read request body
    const text = req.body.text;
    const roomId = req.query.roomId;
    const roomIdx = rooms.findIndex((x) => x.roomId === roomId);

    if (roomIdx === -1) {
      return res.status(404).json({
        ok: false,
        message: "Invalid room id",
      });
    }

    if (typeof text !== "string") {
      return res.status(400).json({
        ok: false,
        message: "Invalid text input",
      });
    }
    //create new id
    const newId = uuidv4();
    const newMessage = {
      messageId: newId,
      text: text,
    };
    rooms[roomIdx].messages.push(newMessage);
    writeDB(rooms);
    return res.json({
      ok: true,
      newMessage,
    });
  }
}
