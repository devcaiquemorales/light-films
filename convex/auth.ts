import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { ConvexError } from "convex/values";

// Closed panel: only e-mails listed in the ALLOWED_EMAILS env var can create an account
function isAllowed(email: string) {
	const allowed = (process.env.ALLOWED_EMAILS ?? "")
		.split(",")
		.map((item) => item.trim().toLowerCase())
		.filter(Boolean);
	return allowed.includes(email.toLowerCase());
}

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [
		Password({
			profile(params) {
				const email = String(params.email ?? "")
					.trim()
					.toLowerCase();
				if (params.flow === "signUp" && !isAllowed(email)) {
					throw new ConvexError("Este e-mail não tem acesso ao painel.");
				}
				return {
					email,
					...(params.name ? { name: String(params.name) } : {}),
				};
			},
		}),
	],
});
