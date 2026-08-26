import SignUpForm from "./SignUpForm";


export default function SignUpPage() {
  return (
    <section className="relative flex min-h-[90vh] w-full items-center justify-center bg-[#050611] px-4 py-12 overflow-hidden">
      {/* Background Ambient Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[350px] sm:h-[400px] sm:w-[500px] rounded-full bg-gradient-to-tr from-purple-600/20 via-cyan-500/10 to-transparent blur-[110px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <SignUpForm />
      </div>
    </section>
  );
}