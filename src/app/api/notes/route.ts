import { getCurrentUser } from '@/lib/server/auth';
import { sql } from '@/lib/server/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parent_id = searchParams.get('parent_id');

  const user = await getCurrentUser();

  let noteRes = null;

  if (parent_id) {
    noteRes = await sql(
      'select * from notes where user_id = $1 and parent_id = $2 order by title asc',
      [user?.id, parent_id]
    );
  } else {
    noteRes = await sql(
      'select * from notes where user_id = $1 and parent_id is null order by title asc',
      [user?.id]
    );
  }

  const ids = noteRes.rows.map((row) => row.id);

  const childNotesCount = await sql(
    'select parent_id, count(*)::int from notes where parent_id = any($1) group by parent_id',
    [ids]
  );

  const childNoteCountMap = childNotesCount.rows.reduce((map, row) => {
    map[row.parent_id] = row.count;

    return map;
  }, {});

  console.log(childNoteCountMap);

  noteRes.rows.forEach((row) => {
    if (childNoteCountMap.hasOwnProperty(row.id)) {
      row.child_count = childNoteCountMap[row.id];
    } else {
      row.child_count = 0;
    }
  });

  return Response.json({ notes: noteRes.rows });
}

export async function POST(_req: Request) {
  const user = await getCurrentUser();

  if (!user) return Response.json({ error: 'User does not exist' }, { status: 404 });

  const noteRes = await sql(
    "insert into notes (title, user_id) values ('Untitled', $1) returning *",
    [user.id]
  );

  return Response.json({ data: noteRes.rows[0] });
}
