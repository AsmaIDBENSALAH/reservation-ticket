package com.odc.reservationserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableFeignClients
@EnableScheduling // 👈 AJOUTE CECI pour activer les 15 minutes d'expiration
public class ReservationServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReservationServerApplication.class, args);
	}

}
