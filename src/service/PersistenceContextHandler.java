package service;

import javax.persistence.*;

public class PersistenceContextHandler {
	
	private static final String PERSISTENCE_UNIT_NAME = "RWA_HOMEWORK_2";
	private static EntityManagerFactory emf = null;
	

	public static EntityManagerFactory getEMF()
	{
		if(emf == null)
			emf =  Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
	
		return emf;
	}

}
