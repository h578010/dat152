package no.hvl.dat152.obl4.database;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.DatatypeConverter;
import org.apache.commons.codec.digest.DigestUtils;

public class AppUserDAO {

  public AppUser getAuthenticatedUser(String username, String password) throws NoSuchAlgorithmException {

    String hashedPassword = generatePassHash(password);

    // Changing the SQL query to a prepared statement. 
    String sql = "SELECT * FROM SecOblig.AppUser" 
        + " WHERE username = ?" + " AND passhash = ?";
    
    
    AppUser user = null;

    Connection c = null;
    PreparedStatement s = null;
    ResultSet r = null;

    try {        
      c = DatabaseHelper.getConnection();
      s = c.prepareStatement(sql);
      s.setString(1, username);
      s.setString(2, password);
      r = s.executeQuery(sql);

      if (r.next()) {
        user = new AppUser(
            r.getString("username"),
            r.getString("passhash"),
            r.getString("firstname"),
            r.getString("lastname"),
            r.getString("mobilephone"),
            r.getString("role")
            );
      }

    } catch (Exception e) {
      System.out.println(e);
    } finally {
      DatabaseHelper.closeConnection(r, s, c);
    }

    return user;
  }

  public boolean saveUser(AppUser user) {

    String sql = "INSERT INTO SecOblig.AppUser VALUES (?, ?, ?, ?, ?, ?)";

    Connection c = null;
    PreparedStatement s = null;
    ResultSet r = null;

    try {
		c = DatabaseHelper.getConnection();
		s = c.prepareStatement(sql);
		s.setString(1, user.getUsername());
		s.setString(2, user.getPasshash());
		s.setString(3, user.getFirstname());
		s.setString(4, user.getLastname());
		s.setString(5, user.getMobilephone());
		s.setString(6, user.getRole());
		int row = s.executeUpdate();
		if (row >= 0) {
			return true;
		}
	} catch (Exception e) {
		System.out.println(e);
		return false;
	} finally {
		DatabaseHelper.closeConnection(r, s, c);
	}

	return false;
  }
  
  public List<String> getUsernames() {
	  
	  List<String> usernames = new ArrayList<String>();
	  
	  String sql = "SELECT username FROM SecOblig.AppUser";

		    Connection c = null;
		    Statement s = null;
		    ResultSet r = null;

		    try {        
		      c = DatabaseHelper.getConnection();
		      s = c.createStatement();       
		      r = s.executeQuery(sql);

		      while (r.next()) {
		    	  usernames.add(r.getString("username"));
		      }

		    } catch (Exception e) {
		      System.out.println(e);
		    } finally {
		      DatabaseHelper.closeConnection(r, s, c);
		    }
	  
	  return usernames;
  }
  
  public boolean updateUserPassword(String username, String passwordnew) throws NoSuchAlgorithmException {
	  
	  String hashedPassword = generatePassHash(passwordnew);
	  
	    String sql = "UPDATE SecOblig.AppUser SET passhash =? WHERE username =?";
	
	    Connection c = null;
	    PreparedStatement s = null;
	    ResultSet r = null;
	
		try {
			c = DatabaseHelper.getConnection();
			s = c.prepareStatement(sql);
			s.setString(1, hashedPassword);
			s.setString(2, username);
			int row = s.executeUpdate();
			if (row >= 0) {
				System.out.println("Password update successful for " + username);
				return true;
			}

		} catch (Exception e) {
			System.out.println(e);
			return false;
		} finally {
			DatabaseHelper.closeConnection(r, s, c);
		}

		return false;
  }
  
  public boolean updateUserRole(String username, String role) {

	    String sql = "UPDATE SecOblig.AppUser SET role =? WHERE username =?";
	
	    Connection c = null;
	    PreparedStatement s = null;
	    ResultSet r = null;
	
	    try {
			c = DatabaseHelper.getConnection();
			s = c.prepareStatement(sql);
			s.setString(1, role);
			s.setString(2, username);
			int row = s.executeUpdate();
			if (row >= 0) {
				System.out.println("Role update successful for " + username + " New role = " + role);
				return true;
			}
		} catch (Exception e) {
			System.out.println(e);
			return false;
		} finally {
			DatabaseHelper.closeConnection(r, s, c);
		}
		return false;
  }
  
  // Changed algorithm from MD5 to SHA-256
  public String generatePassHash(String password) throws NoSuchAlgorithmException {
	  MessageDigest md = MessageDigest.getInstance("SHA-256");
	  byte[] passbytes = password.getBytes();
	  md.update(passbytes);
	  byte[] passhash = md.digest();
	  String hexOfHash = DatatypeConverter.printHexBinary(passhash);
	  return hexOfHash;
  }
  
}

