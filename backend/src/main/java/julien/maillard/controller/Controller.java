package julien.maillard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import julien.maillard.enumeration.Job;
import julien.maillard.model.Message;
import julien.maillard.service.EmailService;

@CrossOrigin(origins = "https://julienmld.fr")
@RestController
public class Controller {

	@Autowired
	private EmailService emailService;
	
	@PostMapping("/contact")
	public void contact(@RequestBody Message message) {
		emailService.sendSimpleMessage(message);
	}

	@PostMapping("/registerVisitor")
	public void registerVisitor(@RequestBody Job job) {
		emailService.registerVisitor(job);
	}

}