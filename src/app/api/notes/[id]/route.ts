import { getCurrentUser } from '@/lib/server/auth';
import { sql } from '@/lib/server/db';
import { UpdateParentSchema } from '@/schemas/note';

interface Params {
  params: {
    id: string;
  };
}

export async function POST(req: Request, { params }: Params) {
  const user = await getCurrentUser();
  const { id } = params;

  const body = await req.json();

  const validatedFields = UpdateParentSchema.safeParse(body);

  if (!validatedFields.success) {
    return Response.json(
      { error: validatedFields.error.flatten().fieldErrors, message: 'Update parent bad  request' },
      { status: 400 }
    );
  }

  const noteRes = await sql('select * from notes where user_id = $1 and id in ($2, $3)', [
    user?.id,
    id,
    validatedFields.data.parent_id,
  ]);

  if (noteRes.rowCount !== 2) {
    return Response.json({ error: 'Unathorized!' }, { status: 403 });
  }

  await sql('update notes set parent_id = $1 where id = $2', [validatedFields.data.parent_id, id]);

  return Response.json({ message: 'Update parent success!' });
}
