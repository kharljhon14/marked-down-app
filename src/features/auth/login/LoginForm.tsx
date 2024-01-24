'use client';

export default function LoginForm() {
  return (
    <form action="">
      <div className="flex flex-col space-y-2 max-w-lg">
        <label htmlFor="">Username</label>
        <input type="text" />

        <label htmlFor="">Password</label>
        <input type="password" />

        <button>Log In</button>
      </div>
    </form>
  );
}
