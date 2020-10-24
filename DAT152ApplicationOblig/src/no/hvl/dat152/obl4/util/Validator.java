package no.hvl.dat152.obl4.util;

import java.security.SecureRandom;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.tomcat.util.codec.binary.Base64;
import org.owasp.encoder.*;

public class Validator {

	public static String validString(String parameter) {
		return parameter != null ? HtmlEscape.escape(parameter) : "null";
	}
	
	public static boolean validPassword(String parameter) {
		return parameter.matches("^([0-9a-zA-Z]{8,30})$");
	}

	public static void ensureCSRFToken(HttpServletRequest request) {
		HttpSession session = ((HttpServletRequest)request).getSession();
		String token = (String) session.getAttribute("csrftoken");
		if(token == null || token.isEmpty()) {

			SecureRandom sr = new SecureRandom();
			byte[] csrf = new byte[16];
			sr.nextBytes(csrf);
			token = Base64.encodeBase64URLSafeString(csrf);
			request.getSession().setAttribute("csrftoken", token);
		}
	}
	public static boolean isCSRFTokenMatch(HttpServletRequest request) {
		HttpSession session = request.getSession();
		String sessionToken = (String) session.getAttribute("csrftoken");
		String requestToken = request.getParameter("csrftoken");
		if(sessionToken.equals(requestToken)) {
			return true;
		} 
		return false;
	}
}
