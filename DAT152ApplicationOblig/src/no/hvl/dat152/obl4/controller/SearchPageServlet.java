package no.hvl.dat152.obl4.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import no.hvl.dat152.obl4.database.AppUser;
import no.hvl.dat152.obl4.database.SearchItem;
import no.hvl.dat152.obl4.database.SearchItemDAO;
import no.hvl.dat152.obl4.util.Role;
import no.hvl.dat152.obl4.util.Validator;

@WebServlet("/searchpage")
public class SearchPageServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// Added no-cache header to avoid caching of session/login
		response.setHeader("Cache-Control", "private, no-store, no-cache, must-revalidate");
		response.addHeader("X-XSS-Protection", "1; mode=block");
		
		Validator.ensureCSRFToken(request);

		if (RequestHelper.isLoggedIn(request)) {
			AppUser authUser = (AppUser) request.getSession().getAttribute("user");

			List<SearchItem> top5history = new ArrayList<SearchItem>();

			if(authUser.getRole().equals(Role.ADMIN.toString())) {

				SearchItemDAO searchItemDAO = new SearchItemDAO();
				top5history = searchItemDAO.getSearchHistoryLastFive();
			}

			request.setAttribute("top5history", top5history);

			request.getRequestDispatcher("searchpage.jsp").forward(request, response);

		} else {
			request.getSession().invalidate();
			request.getRequestDispatcher("index.html").forward(request, response);
		}
	}
}
