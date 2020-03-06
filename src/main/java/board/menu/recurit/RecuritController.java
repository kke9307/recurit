package board.menu.recurit;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import board.menu.recurit.vo.RecuritVO;

@Controller
@SessionAttributes(value = {"recuritUser"})
public class RecuritController {

	private static final Logger logger = LoggerFactory.getLogger(RecuritController.class);
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String Recurit(Locale locale, Model model) {
		HttpServletRequest req = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		 String ip = req.getHeader("X-FORWARDED-FOR");
	        if (ip == null)
	            ip = req.getRemoteAddr();
		logger.info("메인페이지 The client locale is {}.", locale);
		logger.info("접속 IP : {}.",ip);
		Date date = new Date();
		
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
       
         
        model.addAttribute("clientIP", ip);
        
		return "main";
	}
	@RequestMapping(value = "/join", method = RequestMethod.GET)
	public String RecuritJoin(Model model) {
		logger.info("가입페이지 The client model is {}.", model);
		RecuritVO recuritUser = new RecuritVO();
		model.addAttribute("recuritUser", recuritUser);
		return "join";
	}
	@RequestMapping(value = "/writeResume", method = RequestMethod.POST)
	public String RecuritWriteResume(Model model) {
		logger.info("이력서 작성 The client model is {}.", model);
		
		return "writeResume";
	}
}
