export const SUB_MENUS: Record<string, {id: string, icon: string, label: string}[]> = {
  aadhar:[
    {id:"aadhar_manual", icon:"🖨️", label:"Aadhar Manual Print"},
    {id:"aadhar_list",   icon:"📋", label:"Print List"},
  ],
  voter:[
    {id:"voter_manual", icon:"🖨️", label:"Voter Manual Print"},
    {id:"voter_list",   icon:"📋", label:"Print List"},
  ],
  pan:[
    {id:"pan_find",    icon:"🔍", label:"Aadhar To Pan No. Find"},
    {id:"pan_details", icon:"📊", label:"Pan No. To Details"},
    {id:"pan_manual",  icon:"🖨️", label:"Pan Manual"},
    {id:"pan_list",    icon:"📋", label:"Pan Manual Print List"},
  ],
  marksheet:[
    {id:"marksheet_10", icon:"📝", label:"10th Marksheet"},
    {id:"marksheet_12", icon:"📝", label:"12th Marksheet"},
  ],
  nios:[
    {id:"nios_form", icon:"📄", label:"NIOS Certificate Manual"},
  ],
  haryana:[
    {id:"haryana_form", icon:"🏠", label:"Haryana Resident Manual"},
  ],
};
