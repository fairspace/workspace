package io.fairspace.saturn;

import org.apache.jena.fuseki.main.FusekiServer;
import org.apache.jena.tdb2.TDB2Factory;

public class App {
    public static void main(String[] args) {
        System.out.println("Saturn is starting");

        FusekiServer.create()
                .add("/rdf", TDB2Factory.connectDataset("/data/saturn/db"))
                .port(8080)
                .build()
                .start();

        System.out.println("Fuseki is running on :8080/rdf");
    }
}
