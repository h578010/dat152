package no.hvl.dat152.obl4.controller;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import no.hvl.dat152.obl4.database.AppUser;
import no.hvl.dat152.obl4.database.AppUserDAO;
import no.hvl.dat152.obl4.util.HtmlEscape;
import no.hvl.dat152.obl4.util.Role;
import no.hvl.dat152.obl4.util.Validator;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Validator.ensureCSRFToken(request);
		request.getRequestDispatcher("login.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.removeAttribute("message");
		request.removeAttribute("usernames");
		request.removeAttribute("updaterole");

		boolean successfulLogin = false;

		String username = Validator.validString(request.getParameter("username"));
		String password = Validator.validString(request.getParameter("password"));

		if (username != null && password != null) {

			AppUserDAO userDAO = new AppUserDAO();
			AppUser authUser = null;
			try {
				authUser = userDAO.getAuthenticatedUser(username, password);
			} catch (NoSuchAlgorithmException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			if (authUser != null && Validator.isCSRFTokenMatch(request)) {
				successfulLogin = true;
				
				request.getSession().setAttribute("user", authUser);
				request.getSession().setAttribute("updaterole", "");

				// admin issues
				if(authUser.getRole().equals(Role.ADMIN.toString())) {
					List<String> usernames = userDAO.getUsernames();
					request.getSession().setAttribute("usernames", usernames);
					request.getSession().setAttribute("updaterole", "<a href=\"updaterole.jsp\">Update Role</a>");
				}
			}
		}

		if (successfulLogin) {
			response.sendRedirect("searchpage");

		} else {
			request.setAttribute("message", "Username " + username
					+ ": Login failed!");
			request.getRequestDispatcher("login.jsp")
					.forward(request, response);
		}
	}
}
