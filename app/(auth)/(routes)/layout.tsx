const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-6 p-6">
      <div className="text-center max-w-md space-y-2">
        <h1 className="text-2xl font-semibold">Robotics for Social Good</h1>
        <p className="text-sm text-slate-600">
          A free, open-source introduction to robotics for social good. Your
          account saves your progress and your private notes.
        </p>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;