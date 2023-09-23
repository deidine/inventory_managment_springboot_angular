
import { Buro } from '../../models/buro';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BuroService } from '../../services/buro.service';
import { EtageService } from '../../services/etage.service';

import { UserProfile } from 'src/app/models/UserModels';
import { LoginCheckService } from 'src/app/login/services/login-check.service';
import { Entite } from 'src/app/Entite/Entite';
import { EntiteService } from 'src/app/Entite/services/entite.service';
import { Etage } from 'src/app/models/Etage';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class admin implements OnInit {
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

}

