import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';

import { BaseResourceService } from 'src/app/shared/services/base-resouce.service';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm = false;

  protected activatedRoute: ActivatedRoute;
  protected router: Router;
  protected fb: FormBuilder;

  constructor(
    public resource: T,
    protected injector: Injector,
    protected resouceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T
  ) {
    this.activatedRoute = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.fb = this.injector.get(FormBuilder);
   }

  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction === 'new') {
        this.createResource();
    } else {
        this.updateResource();
    }
  }

  protected abstract buildResourceForm(): void;

  // Private Methods

  protected setCurrentAction() {
    if (this.activatedRoute.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }


  protected loadResource() {
    if (this.currentAction === 'edit') {
      this.activatedRoute.paramMap.pipe(
        switchMap(params => this.resouceService.getById(+params.get('id')))
      ).subscribe((resource) => {
        this.resource = resource;
        this.resourceForm.patchValue(resource); // binds load resource data to ResourceForm
      }, (error) => {
        alert('Ocorreu um error no servidor tente mais tarde');
      });
    }
  }

  protected setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = this.creationPageTitle();
    } else {
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected creationPageTitle(): string {
    return 'Novo';
  }

  protected editionPageTitle(): string {
    return 'Edição';
  }


  protected createResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resouceService.create(resource)
    .subscribe(
      resource => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    );
  }

  protected updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resouceService.update(resource)
    .subscribe(
      resource => this.actionsForSuccess(resource),
      error => this.actionsForError(error)
    );
  }

  protected actionsForSuccess(resource: T) {
    toastr.success('Solicitação processada com sucesso!');

    const baseComponentPath = this.activatedRoute.snapshot.parent.url[0].path;

    // redirect/ reload component page
    this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
      () => {
        this.router.navigate([`${baseComponentPath}/${resource.id}/edit`]);
      }
    );
  }

  protected actionsForError(error) {
    toastr.error('Error ao processar a sua solicitação!');

    this.submittingForm = false;

    if (error === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação com  o servidor, tente mais tarde.'];
    }

  }
}
