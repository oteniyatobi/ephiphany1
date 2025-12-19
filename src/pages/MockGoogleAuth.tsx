import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const MockGoogleAuth = () => {
    const [status, setStatus] = useState("connecting"); // connecting, consenting, success

    useEffect(() => {
        // Stage 1: Simulating connection
        const timer1 = setTimeout(() => {
            setStatus("consenting");
        }, 1500);

        return () => clearTimeout(timer1);
    }, []);

    const [customEmail, setCustomEmail] = useState("");
    const [view, setView] = useState("list"); // list, form

    const handleConfirm = (email: string, name: string) => {
        setStatus("success");

        // Send success message to parent window with specific email
        if (window.opener) {
            window.opener.postMessage(
                {
                    type: "GOOGLE_AUTH_SUCCESS",
                    email: email,
                    name: name
                },
                window.location.origin
            );

            // Close popup after short delay
            setTimeout(() => {
                window.close();
            }, 1000);
        } else {
            console.error("No parent window found");
        }
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (customEmail) {
            handleConfirm(customEmail, customEmail.split('@')[0]);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-sans text-gray-800">
            <Card className="w-full max-w-md p-8 shadow-md border-gray-200">
                <div className="flex flex-col items-center space-y-6">
                    {/* Google Logo */}
                    <svg className="w-12 h-12" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>

                    {status === "connecting" && (
                        <div className="space-y-4 text-center">
                            <h1 className="text-xl font-medium">Signing in...</h1>
                            <div className="flex justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                            </div>
                        </div>
                    )}

                    {status === "consenting" && (
                        <div className="space-y-6 text-center w-full">
                            {view === "list" ? (
                                <>
                                    <div>
                                        <h1 className="text-xl font-medium mb-2">Choose an account</h1>
                                        <p className="text-sm text-gray-500">to continue to Epiphany</p>
                                    </div>

                                    <div className="space-y-2">
                                        <div
                                            className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors text-left"
                                            onClick={() => handleConfirm("demo.user@gmail.com", "Demo User")}
                                        >
                                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                                                D
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <p className="font-medium text-sm truncate">Demo User</p>
                                                <p className="text-xs text-gray-500 truncate">demo.user@gmail.com</p>
                                            </div>
                                        </div>

                                        <div
                                            className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors text-left"
                                            onClick={() => handleConfirm("presenter@gmail.com", "Presenter Account")}
                                        >
                                            <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center text-lg font-bold">
                                                P
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <p className="font-medium text-sm truncate">Presenter Account</p>
                                                <p className="text-xs text-gray-500 truncate">presenter@gmail.com</p>
                                            </div>
                                        </div>

                                        <div
                                            className="flex items-center gap-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition-colors text-left mt-4"
                                            onClick={() => setView("form")}
                                        >
                                            <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-sm">Use another account</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <form onSubmit={handleNext} className="space-y-6 w-full text-left">
                                    <div className="text-center">
                                        <h1 className="text-2xl font-normal mb-2">Sign in</h1>
                                        <p className="text-sm text-gray-600">Use your Google Account</p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <input
                                                type="email"
                                                autoFocus
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                                placeholder="Email or phone"
                                                value={customEmail}
                                                onChange={(e) => setCustomEmail(e.target.value)}
                                            />
                                        </div>
                                        <button className="text-blue-600 font-medium text-sm hover:underline">
                                            Forgot email?
                                        </button>
                                        <div className="text-xs text-gray-500 leading-relaxed">
                                            Not your computer? Use Guest mode to sign in privately.{" "}
                                            <span className="text-blue-600 cursor-pointer font-medium hover:underline">
                                                Learn more
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center pt-8">
                                        <button
                                            type="button"
                                            onClick={() => setView("list")}
                                            className="text-blue-600 font-medium text-sm hover:bg-blue-50 px-3 py-2 rounded"
                                        >
                                            Create account
                                        </button>
                                        <Button
                                            type="submit"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}

                    {status === "success" && (
                        <div className="space-y-4 text-center">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-medium">Signed in successfully</h1>
                            <p className="text-sm text-gray-500">You can now close this window...</p>
                        </div>
                    )}
                </div>
            </Card>

            <div className="mt-8 text-xs text-gray-400">
                High-fidelity simulation for Epiphany Demo
            </div>
        </div>
    );
};

export default MockGoogleAuth;
