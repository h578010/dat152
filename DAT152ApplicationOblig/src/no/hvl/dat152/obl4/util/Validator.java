package no.hvl.dat152.obl4.util;

public class Validator {

	public static String validString(String parameter) {
		return parameter != null ? parameter : "null";
	}
	
	public static boolean validPassword(String parameter) {
		return parameter.matches("^([0-9a-zA-ZæøåÆØÅ]{8,30})$");
	}
}
