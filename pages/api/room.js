import { readDB } from "../../backendLibs/dbLib";

export default function roomRoute(req, res) {
  const rooms = readDB();
  const results = [];
  for (const room of rooms) {
    results.push({
      roomId: room.roomId,
      roomName: room.roomName,
    });
  }
  return res.json({
    ok: true,
    results,
  });
}
