package julien.maillard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import julien.maillard.model.Message;
import julien.maillard.model.StatisticDTO;
import julien.maillard.entity.Visitor;
import julien.maillard.service.WebsiteService;

@CrossOrigin(origins = "https://julienmld.fr")
@RestController
public class Controller {

	@Autowired
	private WebsiteService websiteService;

	@PostMapping("/contact")
	public void contact(@RequestBody Message message) {
		websiteService.sendSimpleMessage(message);
	}

	@PostMapping("/registerVisitor")
	public void registerVisitor(@RequestBody Visitor visitor) {
		websiteService.registerVisitor(visitor);
	}

	@GetMapping("/statistics")
	public StatisticDTO getStatisticDTO() {
		return websiteService.getStatisticDTO();
	}

}