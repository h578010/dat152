package no.hvl.dat152.obl4.database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class SearchItemDAO {

  public List<SearchItem> getSearchHistoryLastFive() {
    String sql = "SELECT * FROM SecOblig.History ORDER BY datetime DESC";
    // LIMIT 5
    // Derby lacks LIMIT
    return getSearchItemList(sql,5);
  }

  public List<SearchItem> getSearchHistoryForUser(String username) {
	    String sql = "SELECT * FROM SecOblig.History WHERE username = ? ORDER BY datetime DESC";
	    List<SearchItem> result = new ArrayList<SearchItem>();
	    
	    Connection c = null;
		Statement s = null;
		ResultSet r = null;
		PreparedStatement pstmt = null;

		try {
			c = DatabaseHelper.getConnection();
			pstmt = c.prepareStatement(sql);
			pstmt.setString(1, username);
			pstmt.setMaxRows(50);
			r = pstmt.executeQuery();

			while (r.next()) {
				SearchItem item = new SearchItem(r.getTimestamp("datetime"), r.getString("username"),
						r.getString("searchkey"));
				result.add(item);
			}

		} catch (Exception e) {
			System.out.println(e);
		} finally {
			DatabaseHelper.closeConnection(r, s, c);
		}

		return result;
	  }
  
  public List<SearchItem> getSearchHistoryForUser(String username, String sortkey) {
    String sql = "SELECT * FROM SecOblig.History " 
        + "WHERE username = '" + username 
        + "' ORDER BY "+sortkey+" ASC";
    //  LIMIT 50
    // Derby lacks LIMIT
    return getSearchItemList(sql,50);
  }

  private List<SearchItem> getSearchItemList(String sql,Integer limit) {

    List<SearchItem> result = new ArrayList<SearchItem>();

    Connection c = null;
    Statement s = null;
    ResultSet r = null;

    try {        
      c = DatabaseHelper.getConnection();
      s = c.createStatement();
      if (limit > 0) s.setMaxRows(limit);
      r = s.executeQuery(sql);

      while (r.next()) {
        SearchItem item = new SearchItem(
            r.getTimestamp("datetime"),
            r.getString("username"),
            r.getString("searchkey")
            );
        result.add(item);
      }

    } catch (Exception e) {
    	e.printStackTrace();
      //System.out.println(e);
    } finally {
      DatabaseHelper.closeConnection(r, s, c);
    }

    return result;
  }

  public void saveSearch(SearchItem search) {

    String sql = "INSERT INTO SecOblig.History VALUES (?, ?, ?)";

    Connection c = null;
    PreparedStatement s = null;
    ResultSet r = null;

    try {

		c = DatabaseHelper.getConnection();
		s = c.prepareStatement(sql);
		s.setString(1, search.getDatetime().toString());
		s.setString(2, search.getUsername());
		s.setString(3, search.getSearchkey());

		s.execute();

	} catch (Exception e) {
		System.out.println(e);
	} finally {
		DatabaseHelper.closeConnection(r, s, c);
	}
  }

}
