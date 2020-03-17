import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from './modal.service';

import {
  SettingsService,
  SidebarService,
  HeaderService,
  SharedService,
  UsuarioService,
  LoginGuardGuard,
  AdminGuard,
  VerificaTokenGuard
 } from './service.index';
import { EntradasService } from './entradas.service';
import { EmpresaService } from './empresa/empresa.service';
import { EgresosService } from './egresosService';
import { ClienteService } from './cliente/cliente.service';
import { CobroService } from './ModulosService/cobro.service';
import { DocumentoService } from './ModulosService/documento.service';
import { CentroCostosService } from './ModulosService/centro-costos.service';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    HeaderService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard,
    ModalService,
    EntradasService,
    EmpresaService,
    EgresosService,
    ClienteService,
    CobroService,
    DocumentoService,
    CentroCostosService

  ],
  declarations: []
})
export class ServiceModule { }
